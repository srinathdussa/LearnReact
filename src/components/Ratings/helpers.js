export  function prepareRatings(data) {
  
  const establishments = data.establishments;
  const result={};
        const ratingValues = getRatingValues(establishments);
        const ratings = new Set(ratingValues);
        ratings.forEach(rating => {
          const count = ratingValues.reduce(function (n, val) {
            return n + (val === rating);
          }, 0);
          result[rating] = (count / ratingValues.length * 100).toFixed(2);
          //this.totalPercentage = result[rating] + this.totalPercentage;
        });
        console.log(result);
        return result;
  
}

   function getRatingValues(establishments){
       const ratingValues = [];
    for (let i = 0; i < establishments.length; i++) {
      if (establishments[i]['RatingValue'] && establishments[i]['RatingValue'])
        ratingValues.push(establishments[i]['RatingValue']);
    }
    return ratingValues;
  }
