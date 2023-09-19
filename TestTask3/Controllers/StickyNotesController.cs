using Microsoft.AspNetCore.Mvc;
using TestTask3.Data;

namespace TestTask3.Controllers
{
    [Route("api/[controller]/{id?}")]
    [ApiController]
    public class StickyNotesController : ControllerBase
    {
        private readonly IStickyNoteRepository stickyNoteRepository;

        public StickyNotesController(IStickyNoteRepository stickyNoteRepository) 
        {
            this.stickyNoteRepository = stickyNoteRepository;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return new JsonResult(stickyNoteRepository.GetStickyNotes());
        }

        [HttpDelete]
        public IActionResult Delete(int id) 
        {
            if (stickyNoteRepository.Delete(id))
            {
                return Ok();
            }
            
            return NotFound();
        }
    }
}
