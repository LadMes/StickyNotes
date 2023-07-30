using TestTask3.Models;

namespace TestTask3.Data
{
    public class InMemoryStickyNoteRepository : IStickyNoteRepository
    {
        private readonly AppDbContext context;

        public InMemoryStickyNoteRepository(AppDbContext context) 
        {
            this.context = context;
        }

        public bool Delete(int id)
        {
            var stickyNotes = context.StickyNotes.Where(sn => sn.Id == id).ToList();
            if (stickyNotes.Count != 1)
            {
                return false;
            }

            context.StickyNotes.Remove(stickyNotes[0]);
            context.SaveChanges();
            return true;
        }

        public IList<StickyNote> GetDots()
        {
            return context.StickyNotes.ToList();
        }
    }
}
