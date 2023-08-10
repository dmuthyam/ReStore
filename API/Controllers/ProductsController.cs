using API.Data;
using API.Entitites;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        private readonly StoreContext _context;
     
        public ProductsController(StoreContext context)
        {
            _context = context;            
        }

        [HttpGet] //api/products
        public async Task<ActionResult<List<Product>>> GetProductsAsync(){
            var products = await _context.Products.ToListAsync();

            return Ok(products);
        }

        [HttpGet("{id}")] //api/products/3
        public async Task<ActionResult<Product>> GetProductAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            return Ok(product);
        }
    }
}