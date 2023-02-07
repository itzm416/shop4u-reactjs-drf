const storeToken = (value) => {
    if (value) {
      const { access, refresh } = value
      localStorage.setItem('access_token', access)
      localStorage.setItem('refresh_token', refresh)
    }
  }
  
  const getToken = () => {
    let access_token = localStorage.getItem('access_token')
    let refresh_token = localStorage.getItem('refresh_token')
    return { access_token, refresh_token }
  }
  
  const removeToken = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }
  
  // ----------------------------------------------------
  
  const storeSlug = (slug) => {
    if (slug) {
      localStorage.setItem('product_slug', slug)
    }
  }
  
  const getSlug = () => {
    let product_slug = localStorage.getItem('product_slug')
    return product_slug
  }
  
  const removeSlug = () => {
    localStorage.removeItem('product_slug')
  }
  
  // ----------------------------------------------------
  
  const storeCategory = (category) => {
    if (category) {
      localStorage.setItem('category', category)
    }
  }
  
  const getCategory = () => {
    let category = localStorage.getItem('category')
    return category
  }
  
  const removeCategory = () => {
    localStorage.removeItem('category')
  }
  
  // ----------------------------------------------------
  
  const storeSearch = (search) => {
    if (search) {
      localStorage.setItem('search', search)
    }
  }
  
  const getsearch = () => {
    let search = localStorage.getItem('search')
    return search
  }
  
  const removesearch = () => {
    localStorage.removeItem('search')
  }
  
  const storeid = (id) => {
    if (id) {
      localStorage.setItem('id', id)
    }
  }
  
  const removeid = () => {
    localStorage.removeItem('id')
  }
  
  const getid = () => {
    let id = localStorage.getItem('id')
    return id
  }

  export { storeToken, getToken, removeToken, storeSlug, removeSlug, getSlug, storeCategory, removeCategory, getCategory, storeSearch, getsearch, removesearch, getid, removeid, storeid }
