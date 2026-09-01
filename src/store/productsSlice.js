
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items:[
        {
        id:1,
        name : 'Nike Air Max',
        price : 12000,
      image: '/assets/images.jpg',
      description:'Designed for speed and comfort, these lightweight running shoes provide superior cushioning and excellent grip for your daily runs and workouts.',
        brand : 'Nike'
        },
     {
      id: 2,
      name: 'Adidas Ultraboost',
      price: 15000,
      image: '/assets/images1.jpg',
      description:'Experience all-day comfort with lightweight walking shoes designed with soft cushioning and flexible soles to reduce foot fatigue.',
      brand: 'Adidas',
    },
    {
      id: 3,
      name: 'Puma RS-X',
      price: 9500,
      image: '/assets/images 2.jpg',
      description:'Crafted from premium-quality leather, these shoes deliver a sophisticated look with exceptional comfort for formal and business occasions.',
      brand: 'Puma',
    },
    {
      id: 4,
      name: 'Urban Pulse',
      price: 9500,
      image: '/assets/images3.jpg',
      description:'A perfect blend of style and comfort, these casual sneakers are ideal for everyday wear, keeping you comfortable wherever you go.',
      brand: 'Puma',
    },
     {
      id: 5,
      name: 'Velocity X1',
      price: 9500,
      image: '/assets/images4.jpg',
      description:'A perfect blend of style and comfort, these casual sneakers are ideal for everyday wear, keeping you comfortable wherever you go.',
      brand: 'Puma',
    },
     {
      id: 6,
      name: 'StreetNova',
      price: 9500,
      image: '/assets/images5.jpg',
      description:'A perfect blend of style and comfort, these casual sneakers are ideal for everyday wear, keeping you comfortable wherever you go.',
      brand: 'Puma',
    },
     {
      id: 7,
      name: 'CloudStep Pro',
      price: 9500,
      image: '/assets/images6.jpg',
      description:'Engineered for outdoor adventures, these hiking shoes feature rugged traction, water-resistant materials, and reliable ankle support.',
      brand: 'Puma',
    },
      {
      id: 8,
      name: 'Shadow Rush',
      price: 9500,
      image: '/assets/images7.jpg',
      description:'Engineered for outdoor adventures, these hiking shoes feature rugged traction, water-resistant materials, and reliable ankle support.',
      brand: 'Puma',
    },
      {
      id: 9,
      name: 'Nexa Runner',
      price: 9500,
      image: '/assets/images8.jpg',
      description:'Engineered for outdoor adventures, these hiking shoes feature rugged traction, water-resistant materials, and reliable ankle support.',
      brand: 'Puma',
    },
     {
      id: 10,
      name: 'Titan Glide',
      price: 9500,
      image: '/assets/images9.jpg',
      description:'Engineered for outdoor adventures, these hiking shoes feature rugged traction, water-resistant materials, and reliable ankle support.',
      brand: 'Puma',
    }, {
      id: 11,
      name: 'Vortex Edge',
      price: 9500,
      image: '/assets/images 10.jpg',
      description:'Engineered for outdoor adventures, these hiking shoes feature rugged traction, water-resistant materials, and reliable ankle support.',
      brand: 'Puma',
    }, {
      id: 12,
      name: 'Puma RS-X',
      price: 9500,
      image: '/assets/images11.jpg',
      description:'Engineered for outdoor adventures, these hiking shoes feature rugged traction, water-resistant materials, and reliable ankle support.',
      brand: 'Puma',
    },

      
],
}
const productSlice = createSlice({

    name:'products',
    initialState,
    reducers:{},
});
export default productSlice.reducer;