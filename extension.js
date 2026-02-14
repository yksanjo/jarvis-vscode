// Jarvis VS Code Extension
const vscode = require('vscode');

let tasks = [];

function activate(context) {
    // Jarvis Chat command
    let chatCmd = vscode.commands.registerCommand('jarvis.chat', () => {
        vscode.window.showInformationMessage('🤖 Jarvis: Hello! I\'m your AI assistant.');
    });

    // Add Task command
    let addTaskCmd = vscode.commands.registerCommand('jarvis.task.add', async () => {
        const taskName = await vscode.window.showInputBox({
            placeholder: 'Enter task name',
            prompt: 'Add a new task'
        });
        
        if (taskName) {
            tasks.push({ id: tasks.length + 1, title: taskName, status: 'pending' });
            vscode.window.showInformationMessage(`✅ Task added: ${taskName}`);
        }
    });

    // List Tasks command
    let listTasksCmd = vscode.commands.registerCommand('jarvis.task.list', () => {
        if (tasks.length === 0) {
            vscode.window.showInformationMessage('📋 No tasks found');
        } else {
            const taskList = tasks.map(t => `[${t.id}] ${t.title} (${t.status})`).join('\n');
            vscode.window.showInformationMessage(`📋 Tasks:\n${taskList}`);
        }
    });

    context.subscriptions.push(chatCmd, addTaskCmd, listTasksCmd);
}

function deactivate() {}

module.exports = { activate, deactivate };
