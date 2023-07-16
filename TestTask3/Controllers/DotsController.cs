using Microsoft.AspNetCore.Mvc;
using TestTask3.Data;

namespace TestTask3.Controllers
{
    [Route("api/[controller]/{id?}")]
    [ApiController]
    public class DotsController : ControllerBase
    {
        private readonly IDotRepository dotRepository;

        public DotsController(IDotRepository dotRepository) 
        {
            this.dotRepository = dotRepository;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return new JsonResult(dotRepository.GetDots());
        }

        [HttpDelete]
        public IActionResult Delete(int id) 
        {
            if (dotRepository.Delete(id))
            {
                return Ok();
            }
            
            return NotFound();
        }
    }
}
