function map(doc) {
    if (doc.created_at !== undefined
      && doc.first !== undefined) {
        emit(doc.created_at, {
            name : doc.first,
            city : doc.city
        });
    }
};
