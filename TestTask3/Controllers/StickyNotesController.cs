using Microsoft.AspNetCore.Mvc;
using TestTask3.Data;
using TestTask3.Models;

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
            return Ok(stickyNoteRepository.GetStickyNotes());
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

        [HttpPost]
        public IActionResult Create([FromBody] StickyNote sn)
        {
            // TODO: Add server side checking
            StickyNote stickyNote = stickyNoteRepository.Create(sn);
            return Created($"api/StickyNotes/{stickyNote.Id}", stickyNote);
        }
    }
}
