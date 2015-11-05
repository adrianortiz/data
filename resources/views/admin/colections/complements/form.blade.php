@extends('layout-admin')

@section('title', @trans('title.home'))

@section('content')

    <!-- REVISAR -->
    <div class="head-fixed">
        <div class="head-menu">
            <h1><span><img src="/images/icon-complements.svg"></span> <span> > </span> FORMULARIO: {{ $form->name  }}</h1>
            @include('admin.colections.complements.partials.menu')
        </div>
    </div>

    <div class="container-inputs-list min-top">
    {!! Form::open(['route' => ['admin.colecciones.form.data.store', $form], 'method' => 'GET']) !!}

        @if(count($inputs) === 0)
            <p>Aun no generas un formulario, usa > <a href="{{ route('admin.complements.edit', $form) }}">COMPLEMENTS</a></p>
        @else
            @foreach($inputs as $input)
                <div class="form-group">
                    <label for="{{ $input->title }}">{{ $input->title }}</label>
                    {!! Form::text( $input->type_validation . '[]', old('content'), ['id' => $input->title, 'class' => 'form-control', 'required', 'title' => $input->description, 'data-toggle' => 'tooltip', 'data-placement' => 'right']) !!}
                    {!! Form::hidden( $input->type_validation . 'x[]', $input->id) !!}
                    {!! Form::hidden( $input->type_validation . 'y[]', $input->title) !!}
                </div>
            @endforeach
            <button type="submit" class="btn btn-primary">Guardar datos</button>
        @endif

     {!! Form::close() !!}
    </div>


@endsection

@include('partials.errors')

@section('scripts')
    <script src="{{ asset('/js/form.js') }}"></script>
@endsection