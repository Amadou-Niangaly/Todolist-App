$(document).ready(function() {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function addTask(title, date, description) {
        var task = {
            title: title,
            date: date,
            description: description
        };
        tasks.push(task);
        saveTasks();
        renderTasks();
    }

    function renderTasks() {
        $('#tasks-container').empty();
        tasks.forEach(function(task, index) {
            var taskElement = $('<div class="task">' +
                '<h3>' + task.title + '</h3>' +
                '<p><strong>Date:</strong> ' + task.date + '</p>' +
                '<p><strong>Description:</strong> ' + task.description + '</p>' +
                '<button class="btn-delete" data-index="' + index + '">Supprimer</button>' +
                '<button class="btn-edit" data-index="' + index + '">Modifier</button>' +
                '</div>');
            $('#tasks-container').append(taskElement);
        });
    }

    $('#myForm').submit(function(event) {
        event.preventDefault();
        var title = $('#title').val();
        var date = $('#date').val();
        var description = $('#description').val();
        addTask(title, date, description);
        $(".modal").fadeOut();
        $('#myForm')[0].reset();
    });

    $(document).on('click', '.btn-delete', function() {
        var index = $(this).data('index');
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    });

    $(document).on('click', '.btn-edit', function() {
        var index = $(this).data('index');
        var task = tasks[index];
        $('#title').val(task.title);
        $('#date').val(task.date);
        $('#description').val(task.description);
        $('#myForm').off('submit').submit(function(event) {
            event.preventDefault();
            task.title = $('#title').val();
            task.date = $('#date').val();
            task.description = $('#description').val();
            saveTasks();
            renderTasks();
            $(".modal").fadeOut();
            $('#myForm')[0].reset();
        });
        $(".modal").fadeIn();
    });

    $("#btn-ajt").click(function() {
        $(".modal").fadeIn();
    });

    $(".close").click(function() {
        $(".modal").fadeOut();
    });

    renderTasks();
});
