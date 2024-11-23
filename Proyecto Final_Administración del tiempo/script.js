document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.getElementById("task-list");
    const quadrants = document.querySelectorAll(".quadrant");
    const resetButton = document.getElementById("reset-game");
    const checkButton = document.getElementById("check-answer");
    const result = document.getElementById("result");
    const tasks = Array.from(taskList.children);

    // Respuesta de las tareas en su lugar correspondiente.
    const correctAnswers = {
        "important-urgent": ["task1", "task8", "task9"],
        "important-not-urgent": ["task3", "task5", "task10"],
        "not-important-urgent": ["task4", "task7", "task11"],
        "not-important-not-urgent": ["task2", "task6", "task12"]
    };

    // Function para randomizar el orden de las tareas
    function shuffleTasks() {
        const shuffledTasks = tasks.sort(() => Math.random() - 0.5);
        taskList.innerHTML = ""; // Clear the task list
        shuffledTasks.forEach(task => taskList.appendChild(task));
    }

    // Función de arrastrar y soltar
    tasks.forEach(task => {
        task.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text", e.target.id);
        });
    });

    quadrants.forEach(quadrant => {
        quadrant.addEventListener("dragover", e => {
            e.preventDefault();
        });

        quadrant.addEventListener("drop", e => {
            e.preventDefault();
            const taskId = e.dataTransfer.getData("text");
            const task = document.getElementById(taskId);
            quadrant.appendChild(task);
        });
    });

    // Función para reiniciar el juego/actividad
    function resetGame() {
        tasks.forEach(task => taskList.appendChild(task));
        result.textContent = "";
        shuffleTasks(); // Shuffle tasks on reset
    }

    // Función para verificar las respuestas
    function checkAnswers() {
        let isCorrect = true;

        for (const [quadrantId, taskIds] of Object.entries(correctAnswers)) {
            const quadrant = document.getElementById(quadrantId);
            const assignedTasks = Array.from(quadrant.children).map(task => task.id);

            // Check if all tasks are in the correct quadrant
            if (assignedTasks.sort().join(",") !== taskIds.sort().join(",")) {
                isCorrect = false;
                break;
            }
        }

        result.textContent = isCorrect
            ? "¡Correcto! Has clasificado las tareas correctamente."
            : "Revisa tus respuestas. Algunas tareas están en el lugar incorrecto.";
    }

    // Eventos de los botones
    resetButton.addEventListener("click", resetGame);
    checkButton.addEventListener("click", checkAnswers);

    // Randomizar las tareas al reiniciar
    shuffleTasks();
});
