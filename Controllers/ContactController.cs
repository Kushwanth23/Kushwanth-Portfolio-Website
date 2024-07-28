using Microsoft.AspNetCore.Mvc;
using Kushwanth_Portfolio_Website.Data;
using Kushwanth_Portfolio_Website.Models;

namespace Kushwanth_Portfolio_Website.Controllers
{
    public class ContactController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ContactController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Submit(Contact model)
        {
            if (ModelState.IsValid)
            {
                _context.Contacts.Add(model);
                _context.SaveChanges();
                return Ok(new { message = "Your message has been sent successfully!" });
            }
            return BadRequest(ModelState);
        }
    }
}