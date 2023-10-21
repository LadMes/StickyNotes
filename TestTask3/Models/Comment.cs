namespace TestTask3.Models
{
    public class Comment
    {
        public int Id { get; set; }

        public string Text { get; set; } = "";

        public string BackgroundColorHex { get; set; } = "#F";

        public string TextColorHex { get; set; } = "#0";


        public int StickyNoteId { get; set; }
    }
}
