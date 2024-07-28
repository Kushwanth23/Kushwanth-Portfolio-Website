using Kushwanth_Portfolio_Website.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Kushwanth_Portfolio_Website.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}