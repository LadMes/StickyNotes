using TestTask3.Models;

namespace TestTask3.Data
{
    public interface IDotRepository
    {
        public IList<Dot> GetDots();

        public bool Delete(int id);
    }
}
