/**
 * Created by Ortiz on 10/19/15.
 */


// LIST INSPUTS
function listInputs()
{
    var tablaDatos = $('#datos');
    var route = $("#form-show").attr('action');

    var contador = 1;
    tablaDatos.empty();
    $.get(route, function(res) {
        $(res).each(function(key,value){
            tablaDatos.append('<div class="container-input-base" data-id="'+ value.id +'"><div>'+ contador +'</div><div><span><img src="/images/input.svg"></span>'+ value.title +'</div><div><a href="#"><span><img src="/images/icon-edit.svg"></span></a></div><div><a href="#" class="input-delete" onclick="eliminarInput(this);"><span><img src="/images/icon-delete.svg"></span></a></div></div>');
            contador++;
        });
    });
}




// SHOW/HIDE MODALS INPUTS
function closeModalInputs( nameModal ) {
    $("#"+nameModal).fadeOut();
}

function showModalInputs(nameModal) {
    $("#"+nameModal).fadeIn();
}

// NEW INSPUT
$("#registro-textoCorto").click( function() {
    var datos = $("#form-textoCorto").serializeArray();
    var route = $("#form-textoCorto").attr('action');

    $.ajax({
        url: route,
        type: 'POST',
        dataType: 'json',
        data: datos,

        success:function(){
            closeModalInputs('modal-textoCorto');
            $('#msj-success').fadeIn();
            listInputs();
        }
    });
});

listInputs();







function eliminarInput(objX) {

    $('#modal-delete').fadeIn();

    $('#si').click(function (e) {
        e.preventDefault();
        var div = $(objX).parent('div').parent('div');
        var id = div.data('id');
        var form = $('#form-delete');
        var url = form.attr('action').replace(':USER_ID', id);
        var data = form.serialize();

        div.fadeOut();

        $('.notificacion-text-fondo').fadeOut();
        $.post(url, data, function (result) {
            console.log(result.message);
        }).fail(function () {
            console.log('Input no eliminado');
            div.fadeIn();
        });
    });

    $('#no').click(function (e) {
        $('#modal-delete').fadeOut();
        div = null; id = null; form = null; url = null; data = null;
    });


}

