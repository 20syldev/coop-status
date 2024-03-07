require('dotenv').config();
const {Client, GatewayIntentBits, ActivityType, Partials} = require('discord.js');
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildPresences], 'partials': [Partials.Channel]});

// Express
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Serveur défini avec le port ${port}`);
});


client.on('ready', (x) => {
    console.log(`✅ ${x.user.tag} en ligne !`);
    const serveur = client.guilds.cache.get('1056940597975449710');
    const membres = serveur.memberCount;
    const donateurs = serveur.members.cache.filter(member => member.roles.cache.has('1061274952260653146')).size;

    const activities = [
        {
            name: `${membres} membres`,
            type: ActivityType.Watching,
        },
        {
            name: '!report',
            type: ActivityType.Streaming,
            url: 'https://twitch.tv/20syl__'
        },
        {
            name: `${donateurs} donateurs`,
            type: ActivityType.Watching,
        },
        {
            name: 'les suggestions',
            type: ActivityType.Listening,
        },
        {
            name: 'votre Statut Custom',
            type: ActivityType.Watching,
        },
        {
            name: 'Coop Status',
            type: ActivityType.Playing,
        },
    ];

    let activityIndex = 0;
    setInterval(() => {
        if (activityIndex >= activities.length) {
            activityIndex = 0;
        }
        client.user.setActivity(activities[activityIndex]);
        activityIndex++;
    }, 20000);
});

// 1h Tiers 1 Max sauf pour les donateurs
client.on('guildMemberUpdate', (oldMember, newMember) => {
    const roleTiersId = '1056940597988036693';
    const roleToCheckId = '1061274952260653146';
    const delay = 10 * 60 * 60 * 1000; 
  
    const hasRoleTiers = newMember.roles.cache.has(roleTiersId);
    const hasRoleToCheck = newMember.roles.cache.has(roleToCheckId);
  
    if (hasRoleTiers && !hasRoleToCheck) {
      setTimeout(() => {
        newMember.roles.remove(roleTiersId).catch(console.error);
      }, delay);
    }
});

// Statut Custom ajout rôle soutien
client.on("presenceUpdate", async (oldPresence, newPresence) => {
    if (newPresence.member.user.bot) return;
    
    const memberId = newPresence.userId;
    const roleId = "1101080642432794655";
    const guild = await client.guilds.fetch('1056940597975449710');
    const member = await guild.members.fetch(memberId);

    if (!member.user.bot) {
        if (newPresence.activities.some(activity => activity.name === "Custom Status" && activity.state.includes("coopbot.xyz/discord"))) {
            try {
                await member.roles.add(roleId);
            } catch (err) {
                console.error(`Erreur lors de l'ajout du rôle ${roleId} à ${memberId}:`, err);
            }
        } else {
            try {
                await member.roles.remove(roleId);
            } catch (err) {
                console.error(`Erreur lors de la suppression du rôle ${roleId} à ${memberId}:`, err);
            }
        }
    }
});

// Modifier les salons désignés quand un membre rejoint
client.on('guildMemberAdd', async (member) => {
    const channel = guild.channels.cache.get('1056971965455421472');
    const role = guild.roles.cache.get('1056956831395745874');
    const membres = client.guilds.cache.get('1056940597975449710').memberCount;
  
    role.edit({ name: `Coop Bot - ${membres} Membres` });
    channel.setName(`𝘼ccueil・${membres}👤`);
});

// Modifier les salons désignés quand un membre quitte
client.on('guildMemberRemove', async (member) => {
    const channel = guild.channels.cache.get('1056971965455421472');
    const role = guild.roles.cache.get('1056956831395745874');
    const membres = client.guilds.cache.get('1056940597975449710').memberCount;
  
    role.edit({ name: `Coop Bot - ${membres} Membres` });
    channel.setName(`𝘼ccueil・${membres}👤`);
});

// Dès que le salon getpack-... est créé, envoyer un embed d'introduction
client.on('channelCreate', async (channel) => {
    if (channel.name.startsWith('getpack-')) {
      const embed = {
        title: '👋 Bonjour / Bonsoir, voici votre ticket !',
        description: '> Veuillez envoyer ci-dessous une capture d\'écran de votre mail (utilisez https://prnt.sc/ pour envoyer un screen).\n\n> C\'est une erreur ? Utilisez la commande `.packclose`.\nSoyez patient jusqu\'à ce qu\'un membre du personnel vérifie votre ticket !\n\n🔒 **Fermer**\nVous ou le personnel pouvez utiliser la commande `.packclose` pour fermer le ticket.\n\n> Objet du ticket : Recevoir les récompenses d\'un Pack',
        color: 0x69a5dc,
        thumbnail: {
          url: 'https://cdn.discordapp.com/attachments/899671061933740042/899676586691923988/52722-ticket.png'
        },
        timestamp: new Date().toISOString()
      };
      await channel.send({ embeds: [embed] });
    }
});

// Quand le bot reçoit un MP, envoyer le report dans le salon modmail
client.on('messageCreate', async (message) => {
    const prefix = '!';
    if (message.author.bot) return;
    if (!message.guild) {
      if (message.content.startsWith(prefix + 'report')) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
  
        if (args.length === 0) {
          const errorMessage = await message.reply('Utilisation incorrecte. Utilisez `!report <problème>` pour créer un rapport.');
          setTimeout(() => {
            errorMessage.delete();
          }, 5000);
          return;
        }
  
        const guild = client.guilds.cache.get('1056940597975449710');
        if (!guild) {
          return;
        }
  
        const modmailChannel = guild.channels.cache.get('1113838050636730378');
        if (!modmailChannel) {
          return;
        }
  
        const reportContent = args.join(' ');
        const modmailMessage = `📋 Rapport crée par ${message.author} (${message.author.id}) :\n\`\`\`${reportContent}\`\`\``;
        modmailChannel.send(modmailMessage);
  
        const confirmationMessage = await message.reply(`Votre problème a été signalé !`);
        setTimeout(() => {
          confirmationMessage.delete();
        }, 5000);
      }
    }
});

client.login(process.env.TOKEN);