import { typeColors } from './Content/pokemons/typeColors';

export const GetColors = (type) => {
  let color
      // takes type of pokemon and gets color of that type from typeColor array
      if(!type) return  
   color = typeColors.filter(
      (t) => Object.keys(t)[0] === type.toLowerCase()
    )
    if (color.length === 0) color = [{ none: "rgb(255, 255, 255)" }];
  
    return color;
}
