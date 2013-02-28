// Apache 2.0 J Chris Anderson 2011
jQuery(function() {
    var path = unescape(document.location.pathname).split('/'),
        design = path[3],
        db = jQuery.couch.db(path[1]);
    function drawItems() {
        db.view(design + "/recent-signups", {
            descending : "true",
            limit : 50,
            update_seq : true,
            success : function(data) {
                if(data.rows !== undefined && data.rows.length){
                    setupChanges(data.update_seq);
                    var them = jQuery.mustache(jQuery("#recent-signups").html(), {
                        signups : data.rows.map(function(r) {return r.value;})
                    });
                    jQuery("#content").html(them);
                }
            }
        });
    };
    drawItems();
    var changesRunning = false;
    function setupChanges(since) {
        if (!changesRunning) {
            var changeHandler = db.changes(since);
            changesRunning = true;
            changeHandler.onChange(drawItems);
        }
    }
    $("#account").couchLogin({
        loggedIn : function(r) {
            $("#signupbutton").attr("data-toggle","modal").removeAttr("disabled")
        },
        loggedOut : function() {
            $("#signupbutton").removeAttr("data-toggle").attr("disabled","disabled")
        }
    });

 });

jQuery('input[name="email"]').change(function(){
    if($(this).val()){
        jQuery('input[name="tel"]').removeAttr('required')
    }else{
        jQuery('input[name="tel"]').attr('required','required')
    }
})
jQuery("#signupform").couchForm({
    beforeSave : function(doc){
        doc.created_at = new Date()
        jQuery('input[name="tel"]').attr('required','required')
        jQuery('#myModal').modal('hide')
        return doc
    }
});
