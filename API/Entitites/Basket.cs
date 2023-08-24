namespace API.Entitites
{
    public class Basket
    {
        public int Id { get; set; }  
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new();
       
        public void AddItem(Product product, int quantity)
        {
            if(Items.All(x=>x.ProductId!=product.Id))   
                Items.Add(new BasketItem{Product=product, Quantity=quantity}) ;

        var existing = Items.FirstOrDefault(x=>x.ProductId==product.Id);
        if(existing!=null)
            existing.Quantity+=quantity;

        }

         public void RemoveItem(int productId, int quantity){
            var item = Items.FirstOrDefault(x=>x.ProductId==productId);
            if(item==null)
                return;
            item.Quantity-=quantity;
            if(item.Quantity==0)
                 Items.Remove(item);
         }

    }   
}