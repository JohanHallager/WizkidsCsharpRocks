using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WizkidsCsharpRocks.Models;

namespace WizkidsCsharpRocks.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WizkidsApiController : ControllerBase
    {
        public readonly string baseUrl = "https://services.lingapps.dk/misc/getPredictions?locale=da-DK&text=";
        private HttpClient httpClient;
        public WizkidsApiController()
        {
            httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Authorization = 
                new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", "MjAxOS0xMC0wMg==.NDJAam9oYW5oYWxsYWdlci5kaw==.MTI3MDQxNGRkZWJlMGFkZDNmNDRkYTc0YjRhMDM1NjE=");
        }

        public async Task<ActionResult<IEnumerable<Words>>> Get(string text)
         {
            if (string.IsNullOrWhiteSpace(text))
            {
                return NotFound();
            }

            var word = text.Split(" ").Where(w => !string.IsNullOrEmpty(w)).ToArray().Last().ToLower();


            var response = await httpClient.GetAsync(baseUrl + word);
            if (!response.IsSuccessStatusCode)
            {
                return NotFound();
            }
            string apiResponse = await response.Content.ReadAsStringAsync();
            var dictionary = JsonConvert.DeserializeObject<string[]>(apiResponse);
            

            return dictionary.Select(d => new Words { Value = d }).OrderBy(w=>w.Value.Length ).ToList();
        }
    }
}