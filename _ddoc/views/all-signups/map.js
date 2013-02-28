function map(doc) {
    if (doc.created_at !== undefined) {
        emit(doc.created_at, doc )
    }
};
