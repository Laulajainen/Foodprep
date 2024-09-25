using Foodprep.UpdateDB;
using MySql.Data.MySqlClient;
using System;

namespace FoodPrepApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Updater.UpdateData();
        }   
    }
}