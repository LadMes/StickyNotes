using TestTask3.Models;

namespace TestTask3.Data
{
    public interface IStickyNoteRepository
    {
        public IList<StickyNote> GetDots();

        public bool Delete(int id);
    }
}
