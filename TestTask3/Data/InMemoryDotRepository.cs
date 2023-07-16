using TestTask3.Models;

namespace TestTask3.Data
{
    public class InMemoryDotRepository : IDotRepository
    {
        private readonly AppDbContext context;

        public InMemoryDotRepository(AppDbContext context) 
        {
            this.context = context;
        }

        public bool Delete(int id)
        {
            var dots = context.Dots.Where(d => d.Id == id).ToList();
            if (dots.Count != 1)
            {
                return false;
            }

            context.Dots.Remove(dots[0]);
            context.SaveChanges();
            return true;
        }

        public IList<Dot> GetDots()
        {
            return context.Dots.ToList();
        }
    }
}
