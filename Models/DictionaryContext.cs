using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WizkidsCsharpRocks.Models
{
    public class DictionaryContext : DbContext
    {
        public DbSet<Words> Words { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlite("Data Source=Dictionary.db");
        }
    }
}
 