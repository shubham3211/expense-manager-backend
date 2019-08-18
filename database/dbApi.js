class DatabaseApi {
  constructor(model){
    if(typeof model === 'undefined'){
      throw new Error('No model provided');
    }
    this.model = model;
  }

  getData(searchParameter = {}) {
    return this.model.find(searchParameter);
  }

  updateOneRow(searchParameter, updatedData) {
    return this.model.findOneAndUpdate(searchParameter, updatedData, {new: true});    
  }

  deleteOneRow(searchParameter) {
    return this.model.findOneAndRemove(searchParameter);   
  }

  addCollections(newRowInfo) {
    const newInstance = new this.model(newRowInfo);
    return newInstance.save();
  }
}

module.exports = DatabaseApi;