require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://test:test@cluster0.nxd1a.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person',personSchema);

const createAndSavePerson = (done) => {
  let document = new Person({name:"carlos", age:32, favoriteFoods:['nothing']});
  document.save(function(err,data) {
    done(null ,data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err,data) {
      if (err) console.log(err);
      done(null, data);
  })
};

const findPeopleByName = (personName, done) => {
  let matches = Person.find({name: personName}, function(err,data) {
    done(null , data);
  });
  console.log(matches);
  
};

const findOneByFood = (food, done) => {
  let matches = Person.findOne({favoriteFoods: food}, function(err,data) {
    done(null , data);
  })
  console.log(matches);
}; 

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err,data) {
    done(null , data);  
  })
};

const findEditThenSave = (personId, done) => {
    const foodToAdd = "hamburger";
    Person.findById(personId, function(err,person) {
      if (err) console.log(err);
      person.favoriteFoods.push(foodToAdd);
      person.save(function(err,data) {
        if (err) console.log(err);
        done(null,data);
      })
    })
  };

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;  
  let data = Person.findOneAndUpdate({name: personName}, {age:ageToSet}, {new: true}, function(er,data) {
    done(null , data);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(err,data) {
    done(null, data);
  })

};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, function(err,data) {
    done(null, data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}).sort({name:1}).limit(2).select({age:0}).exec(function(err,data) {
    done(null, data);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
