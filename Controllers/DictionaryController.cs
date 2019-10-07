using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WizkidsCsharpRocks.Models;

namespace WizkidsCsharpRocks.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DictionaryController : ControllerBase
    {
        private readonly DictionaryContext _context;

        public DictionaryController(DictionaryContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Words>>> Get(string text)
        {
            if (string.IsNullOrWhiteSpace(text))
            {
                return NotFound();
            }

            var word = text.Split(" ").Where(w=>!string.IsNullOrEmpty(w)).ToArray().Last().ToLower();

            return await  _context.Words.Where(w=>w.Value.ToLower()
                                        .StartsWith(word))
                                        .OrderBy(w=>w.Value.Length)
                                        .ToListAsync();
        }
    }
}
