using TestTask3.Models;

namespace TestTask3.Data
{
    public class PostgresStickyNoteRepository : IStickyNoteRepository
    {
        private readonly AppDbContext context;

        public PostgresStickyNoteRepository(AppDbContext context) 
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

        public IList<StickyNote> GetStickyNotes()
        {
            return context.StickyNotes.ToList();
        }

        public StickyNote Create(Dot dot)
        {
            StickyNote stickyNote = new StickyNote()
            {
                Dot = dot
            };
            
            context.StickyNotes.Add(stickyNote);
            context.SaveChanges();

            return stickyNote;
        }
    }
}
