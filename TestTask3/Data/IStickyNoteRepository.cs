using TestTask3.Models;

namespace TestTask3.Data
{
    public interface IStickyNoteRepository
    {
        public IList<StickyNote> GetStickyNotes();

        public bool Delete(int id);

        public StickyNote Create(StickyNote stickyNote);
    }
}
