using System;
using System.Net.Http;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using Newtonsoft.Json.Linq;

namespace Foodprep.UpdateDB
{
    internal class Updater
    {
        private static readonly string connectionString = "server=localhost;database=foodprep;user=root;";

        public static async Task GetDataAsync()
        {
            string apiUrl = "https://dataportal.livsmedelsverket.se/livsmedel/api/v1/livsmedel?offset=0&limit=9999&sprak=1";

            // Make HTTP request to fetch the data
            using (HttpClient client = new HttpClient())
            {
                HttpResponseMessage response = await client.GetAsync(apiUrl);
                if (response.IsSuccessStatusCode)
                {
                    string data = await response.Content.ReadAsStringAsync();

                    // Parse the data and update the database
                    await UpdateDatabaseAsync(data);
                }
                else
                {
                    Console.WriteLine("Failed to fetch data from the API.");
                }
            }
        }

        private static async Task UpdateDatabaseAsync(string data)
        {
            JObject jsonObject = JObject.Parse(data);
            JArray items = (JArray?)jsonObject["livsmedel"] ?? new JArray();

            using (MySqlConnection conn = new MySqlConnection(connectionString))
            {
                await conn.OpenAsync();

                foreach (var item in items)
                {
                    int mealId = item["nummer"]?.Value<int>() ?? 0;
                    string name = item["namn"]?.Value<string>() ?? string.Empty;

                    // Make an additional API call to check if the meal has ingredients
                    string ingredientApiUrl = $"https://dataportal.livsmedelsverket.se/livsmedel/api/v1/livsmedel/{mealId}/ingredienser?sprak=1";
                    using (HttpClient client = new HttpClient())
                    {
                        HttpResponseMessage ingredientResponse = await client.GetAsync(ingredientApiUrl);
                        if (ingredientResponse.IsSuccessStatusCode)
                        {
                            string ingredientData = await ingredientResponse.Content.ReadAsStringAsync();
                            JArray ingredientItems = JArray.Parse(ingredientData);

                            if (ingredientItems.Count > 0)
                            {
                                // Insert into meals table
                                string mealQuery = @"
                                    INSERT INTO meals (mealId, name)
                                    VALUES (@mealId, @name)
                                    ON DUPLICATE KEY UPDATE
                                        Name = VALUES(Name)";

                                using (MySqlCommand cmd = new MySqlCommand(mealQuery, conn))
                                {
                                    cmd.Parameters.AddWithValue("@MealId", mealId);
                                    cmd.Parameters.AddWithValue("@Name", name);

                                    await cmd.ExecuteNonQueryAsync();
                                }

                                // Insert ingredients and maintain references
                                foreach (var ingredientItem in ingredientItems)
                                {
                                    string ingredientName = ingredientItem["namn"]?.Value<string>() ?? string.Empty;

                                    string ingredientQuery = @"
                                        INSERT INTO ingredients (name)
                                        VALUES (@name)
                                        ON DUPLICATE KEY UPDATE
                                            id = LAST_INSERT_ID(id)";

                                    int ingredientId;
                                    using (MySqlCommand cmd = new MySqlCommand(ingredientQuery, conn))
                                    {
                                        cmd.Parameters.AddWithValue("@Name", ingredientName);
                                        await cmd.ExecuteNonQueryAsync();
                                        ingredientId = (int)cmd.LastInsertedId;
                                    }

                                    // Insert into meal_ingredients table to reference meals and ingredients
                                    string mealIngredientQuery = @"
                                        INSERT INTO meal_ingredients (mealId, ingredientId)
                                        VALUES (@mealId, @ingredientId)
                                        ON DUPLICATE KEY UPDATE
                                            mealNummer = VALUES(mealId), ingredientId = VALUES(ingredientId)";

                                    using (MySqlCommand cmd = new MySqlCommand(mealIngredientQuery, conn))
                                    {
                                        cmd.Parameters.AddWithValue("@mealId", mealId);
                                        cmd.Parameters.AddWithValue("@ingredientId", ingredientId);

                                        await cmd.ExecuteNonQueryAsync();
                                    }
                                }

                                Console.WriteLine($"Successfully updated or inserted meal with Mealid: {mealId} and its ingredients.");
                            }
                            else
                            {
                                Console.WriteLine($"No ingredients found for meal with Mealid: {mealId}");
                            }
                        }
                        else
                        {
                            Console.WriteLine($"Failed to fetch ingredients for meal with Mealid: {mealId}");
                        }
                    }
                }
            }
        }

        public static void UpdateData()
        {
            GetDataAsync().Wait();
        }
    }
}