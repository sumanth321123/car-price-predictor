import React, { useState } from 'react';
import './CarPriceForm.css'; 
const w0 = 11.398802102935838; 
const w = [
   1.91027143e-03,  1.15519392e-01, -8.82646625e-03,  8.45692211e-03,
    -5.31283218e-05, -9.87743814e-02, -1.18312384e+00, -1.34924951e+00,
    -1.17318920e+00, -7.31556582e-02,  1.55412664e-01,  5.92705519e-03,
    -1.33503930e-01, -1.39465933e-01, -5.31680180e-01,  1.84954753e-02,
    -3.91930615e-01, -6.00386918e-01
];
const dot = (xi, w) => 
{
  return xi.reduce((sum, x, i) => sum + x * w[i], 0);
};
const linearRegression = (xi) => 
{
  const xiWithBias = [1, ...xi];
  return dot(xiWithBias, [w0, ...w]);
};
const prepareX = (car) => 
{
  const { engine_hp, engine_cylinders, highway_mpg, city_mpg, popularity, year, number_of_doors, make, engine_fuel_type } = car;
  let features = [engine_hp, engine_cylinders, highway_mpg, city_mpg, popularity, 2017 - year];
  
  [2, 3, 4].forEach(v => features.push(number_of_doors === v ? 1 : 0));
  ['chevrolet', 'ford', 'volkswagen', 'toyota', 'dodge'].forEach(m => features.push(make === m ? 1 : 0));
  ['regular_unleaded', 'premium_unleaded_(required)', 'premium_unleaded_(recommended)', 'flex-fuel_(unleaded/e85)'].forEach(f => features.push(engine_fuel_type === f ? 1 : 0));
  console.log('Features:', features);
  return features;
};
const predictPrice = (car) => {
  const X = prepareX(car);
  const logPrice = linearRegression(X);
  const price = Math.expm1(logPrice);  
  console.log('Log Price:', logPrice); 
  console.log('Predicted Price:', price);  
  return price;
};
const CarPriceForm = () => 
{
  const [formData, setFormData] = useState({
    engine_hp: '',
    engine_cylinders: '',
    highway_mpg: '',
    city_mpg: '',
    popularity: '',
    year: '',
    number_of_doors: '',
    make: '',
    engine_fuel_type: ''
  });
  const [predictedPrice, setPredictedPrice] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const price = predictPrice(formData);
    setPredictedPrice(price);
  };

  return (
    <div className="centered-form"> 
      <form onSubmit={handleSubmit}>
        <input type="number" name="engine_hp" value={formData.engine_hp} onChange={handleChange} placeholder="Engine Horsepower" required />
        <input type="number" name="engine_cylinders" value={formData.engine_cylinders} onChange={handleChange} placeholder="Engine Cylinders" required />
        <input type="number" name="highway_mpg" value={formData.highway_mpg} onChange={handleChange} placeholder="Highway MPG" required />
        <input type="number" name="city_mpg" value={formData.city_mpg} onChange={handleChange} placeholder="City MPG" required />
        <input type="number" name="popularity" value={formData.popularity} onChange={handleChange} placeholder="Popularity" required />
        <input type="number" name="year" value={formData.year} onChange={handleChange} placeholder="Year" required />
        <input type="number" name="number_of_doors" value={formData.number_of_doors} onChange={handleChange} placeholder="Number of Doors (2, 3, or 4)" required />
        <input type="text" name="make" value={formData.make} onChange={handleChange} placeholder="Make (chevrolet, ford, volkswagen, toyota, dodge)" required />
        <input type="text" name="engine_fuel_type" value={formData.engine_fuel_type} onChange={handleChange} placeholder="Engine Fuel Type (regular_unleaded, premium_unleaded_(required), premium_unleaded_(recommended), flex-fuel_(unleaded/e85))" required />
        <button type="submit">Predict Price</button>
      </form>
      {predictedPrice !== null && <p>The predicted MSRP is: ${predictedPrice.toFixed(2)}</p>}
    </div>
  );
};

export default CarPriceForm;