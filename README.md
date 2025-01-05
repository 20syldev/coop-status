<div align="center">
  <a href="https://coopbot.xyz"><img src="https://github.com/20syldev/coop-status/blob/master/src/coopstatus.png" alt="Logo" width="25%" height="auto"/></a>

  # Coop Status - Bot Discord
  [![Version](https://custom-icon-badges.demolab.com/badge/Version%20:-v1.2.0-6479ee?logo=coopstatus&labelColor=23272A)](https://github.com/20syldev/coop-status/releases/latest)
  [![Statut](https://img.shields.io/badge/Statut%20:-Archivé-e39f1b?labelColor=23272A)](https://github.com/20syldev/coop-status#readme)
</div>

---

## À propos du bot
Le bot **Coop Status** est un ajout personnel pour notre expérience sur le [serveur support Discord](https://coopbot.xyz/discord) de **Coop**. Avec quelques fonctionnalités utiles, nous pouvons automatiser certaines tâches sur notre serveur.
> *Le bot est privé, donc vous ne pouvez pas l'inviter certes, mais vous pouvez toujours copier le code source pour faire votre bot avec nos fonctionnalités !*

## Les caractéristiques
- Hébergé **24h/7j**
- Détection de rôle pour :
    - Quand le rôle **Tiers 1** est reçu pendant 1 heure après un vote sur [Top.gg](https://top.gg/bot/881455282838962186)
    - Combien il y a de membres avec le grade **Donateur** sur le serveur (voir [comment obtenir ce grade](https://coopbot.xyz/infos/donate))
    - Statut Discord personnalisé, avec l'ajout d'un rôle **Soutien** lorsqu'un certain statut est mit (voir [comment obtenir ce grade](https://coopbot.xyz/infos/support))
 - Détection de **création de salon** pour envoyer un message direct quand on ouvre un ticket de pack dans le [salon tickets](https://discord.com/channels/1056940597975449710/1069184863426588702) ([en savoir plus](https://coopbot.xyz/infos/grade))
 - Mail en message privé avec le bot, pour envoyer un **signalement** ou autre chose, juste avec la commande **`!report <problème>`**

## Tester le bot localement
```console
$ npm run build
```
```console
> coop-status@1.2.0 build
> npm install && node app.js

[...]

found 0 vulnerabilities
Serveur en ligne sur le port 4000
✅ Bot en ligne !
```