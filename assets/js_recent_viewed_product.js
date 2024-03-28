
export function useVisitedProducts() {
    const visited = reactive({
      products:[],
      transformedProduct: computed( transformData),
      current:null,
      openVisited:false,
    })
  
    function transformData () {
      let items = visited.products
      if(!!visited.current)
      items = items.filter( product => product.id !== visited.current.id)
      return items
    }
  
    function clearVisited () {
      localStorage.removeItem("molten_catalog_visited")
      visited.products = []
    }
  
    function initializeVisited (product) {
      visited.current = product
  
      const existed = visited.products.find(item => item.id == product.id);
  
      if(existed) 
        visited.products = visited.products.filter(item => item.id !== product.id)
       
      visited.products.unshift(product)
  
      if(visited.products.length > 10)
        visited.products.pop()
  
      localStorage.setItem("molten_catalog_visited", JSON.stringify(visited.products)) 
    }
  
    onMounted(()=> {
      const db = localStorage.getItem("molten_catalog_visited")
      if(db) 
        visited.products = JSON.parse(db); 
    })
  
  
    return {
      ...toRefs(visited),
      clearVisited,
      initializeVisited,
    
    }
  
}

export default useVisitedProducts;