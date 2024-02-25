app.get('/search/restaurants', (req, res) => {
    const { category } = req.query;
    let { page } = req.query; 
    if (!category) {
        return res.status(400).send({ error: '카테고리를 입력하세요' });
    }

    if (!page) {
        page = 1;
    } else {
        page = parseInt(page); 
    } 

    const pageSize = 10; 
    const filteredRestaurants = restaurants.filter(restaurant => 
        restaurant.category === category
    );
  
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const paginatedRestaurants = filteredRestaurants.slice(startIndex, endIndex);

    // 필터링되고 페이징 처리된 결과 반환
    res.send({ data: paginatedRestaurants, currentPage: page, total: filteredRestaurants.length });
});
