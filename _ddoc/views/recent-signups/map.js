function(doc) {
  if (doc.created_at !== undefined) {
      var nickname = doc.nickname || doc.first;
      if(nickname !== undefined){
          emit(doc.created_at, {
              message:doc.message,
              nickname : nickname,
              city : doc.city
          });
      }
  }
};