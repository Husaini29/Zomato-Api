Api Link:
 http://localhost:9896/

 https://zomato--api.herokuapp.com/


Page 1: => List of Cities: http://localhost:9896/location 
                           https://zomato--api.herokuapp.com/location

=> List of Restaurants: http://localhost:9896/restaurants
                        https://zomato--api.herokuapp.com/restaurants

=> List of Restaurants w.r.t City: http://localhost:9896/restaurants?state_id=2 
                                   https://zomato--api.herokuapp.com/restaurants?state_id=2

=> Quick Search Data: http://localhost:9896/mealType
                      https://zomato--api.herokuapp.com/mealType

Page 2: => Restaurants w.r.t quicksearch: http://localhost:9896/restaurants?mealtype_id=1
                                          https://zomato--api.herokuapp.com/restaurants?mealtype_id=1

=> Filter => Data w.r.t cuisine and quicksearch (Cuisine Filter): http://localhost:9896/filter/2?cuisine=4    
                                                        https://zomato--api.herokuapp.com/filter/2?cuisine=4

=> Cost filter: http://localhost:9896/filter/2?lcost=200&hcost=700 
                https://zomato--api.herokuapp.com/filter/2?lcost=200&hcost=700

=> Data w.r.t cuisine filter and cost filter: http://localhost:9896/filter/1?cuisine=2&lcost=200&hcost=500 
                                    https://zomato--api.herokuapp.com/filter/1?cuisine=2&lcost=200&hcost=500

=> Sort Low to high in quicksearch:  http://localhost:9896/filter/2?lcost=200&hcost=500&sort=1
                                     https://zomato--api.herokuapp.com/filter/2?lcost=200&hcost=500&sort=1

High to low in quicksearch: http://localhost:9896/filter/2?lcost=200&hcost=500&sort=-1 
                            https://zomato--api.herokuapp.com/filter/2?lcost=200&hcost=500&sort=-1

=> Pagination: http://localhost:9896/filter/1?cuisine=1&skip=0&limit=2 
               https://zomato--api.herokuapp.com/filter/1?cuisine=1&skip=0&limit=2

=> Data w.r.t City & Mealtype(optional): http://localhost:9896/restaurants?state_id=1&mealtype_id=2 
                                        https://zomato--api.herokuapp.com/restaurants?state_id=1&mealtype_id=2

Page 3: => Restaurant Details: http://localhost:9896/details/1 
                               https://zomato--api.herokuapp.com/details/1

=> Menu w.r.t Restaurants: http://localhost:9896/menu/1
                           https://zomato--api.herokuapp.com/menu/1

Page 4: => Api to place order: http://localhost:9896/placeOrder 
                               https://zomato--api.herokuapp.com/placeOrder

=> Menu items based on user's selection: http://localhost:9896/menuItem 
                                         https://zomato--api.herokuapp.com/menuItem

Page 5: => List all orders: http://localhost:9896/orders 
                            https://zomato--api.herokuapp.com/orders

http://localhost:9896/orders?email="Husaini@gmail.com"
 https://zomato--api.herokuapp.com/orders?email=Husaini@gmail.com

(Optional) => To delete Order(s): http://localhost:9896/deleteOrder 
                                https://zomato--api.herokuapp.com/deleteOrder

=> To update Order(s): http://localhost:9896/updateOrder/6203d1d514da18ef4bf7636c?status=Success
 https://zomato--api.herokuapp.com/updateOrder/6203d1d514da18ef4bf7636c?status=Success