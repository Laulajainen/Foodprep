using Foodprep.API.Data;
using Foodprep.API.Endpoints;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        // Add services to the container.
        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
        builder.Services.AddDbContext<FoodprepContext>(options =>
            options.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 21))));

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowAll", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            });
        });

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseCors("AllowAll");

        //app.UseHttpsRedirection();

        // Map endpoints
        app.MapMealEndpoints();
        app.MapDayEndpoints();
        app.MapWeekEndpoints();

        app.Run("http://0.0.0.0:7055"); // Listen on all network interfaces
    }
}