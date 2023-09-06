import { PinCushion } from "./apps/PinCushion.js";
import CONSTANTS from "./constants.js";
import { i18n } from "./lib/lib.js";

export const registerSettings = function () {
  game.settings.registerMenu(CONSTANTS.MODULE_ID, "resetAllSettings", {
    name: `pin-cushion.SETTINGS.reset.name`,
    hint: `pin-cushion.SETTINGS.reset.hint`,
    icon: "fas fa-coins",
    type: ResetSettingsDialog,
    restricted: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "forceToShowNotes", {
    name: game.i18n.localize(`pin-cushion.SETTINGS.forceToShowNotesN`),
    hint: game.i18n.localize(`pin-cushion.SETTINGS.forceToShowNotesH`),
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "previewMaxLength", {
    name: game.i18n.localize(`pin-cushion.SETTINGS.PreviewMaxLengthN`),
    hint: game.i18n.localize(`pin-cushion.SETTINGS.PreviewMaxLengthH`),
    scope: "world",
    type: Number,
    default: 500,
    config: true,
    onChange: (s) => {},
  });

  game.settings.register(CONSTANTS.MODULE_ID, "previewDelay", {
    name: game.i18n.localize(`pin-cushion.SETTINGS.PreviewDelayN`),
    hint: game.i18n.localize(`pin-cushion.SETTINGS.PreviewDelayH`),
    scope: "world",
    type: Number,
    default: 500,
    config: true,
    onChange: (s) => {},
    //@ts-ignore
    range: { min: 100, max: 3000, step: 100 }, // bug https://github.com/p4535992/foundryvtt-pin-cushion/issues/18
  });

  game.settings.register(CONSTANTS.MODULE_ID, "defaultJournalPermission", {
    name: game.i18n.localize(`pin-cushion.SETTINGS.DefaultJournalPermissionN`),
    hint: game.i18n.localize(`pin-cushion.SETTINGS.DefaultJournalPermissionH`),
    scope: "world",
    type: Number,
    choices: Object.entries(CONST.DOCUMENT_PERMISSION_LEVELS).reduce((acc, [perm, key]) => {
      acc[key] = game.i18n.localize(`pin-cushion.SETTINGS.DefaultJournalPermission.PERMISSION.${perm}`);
      return acc;
    }, {}),
    default: 0,
    config: true,
    onChange: (s) => {},
  });

  game.settings.register(CONSTANTS.MODULE_ID, "defaultJournalFolder", {
    name: game.i18n.localize(`pin-cushion.SETTINGS.DefaultJournalFolderN`),
    hint: game.i18n.localize(`pin-cushion.SETTINGS.DefaultJournalFolderH`),
    scope: "world",
    type: String,
    choices: {
      none: game.i18n.localize(`pin-cushion.None`),
      perUser: game.i18n.localize(`pin-cushion.PerUser`),
      specificFolder: game.i18n.localize(`pin-cushion.PerSpecificFolder`),
    },
    default: "none",
    config: true,
    onChange: (s) => {
      // Only run check for folder creation for the main GM
      if (s === "perUser" && game.user === game.users.find((u) => u.isGM && u.active)) {
        PinCushion._createFolders();
      }
    },
  });

  game.settings.register(CONSTANTS.MODULE_ID, "defaultNoteImageOnCreate", {
    name: game.i18n.localize(`pin-cushion.SETTINGS.defaultNoteImageOnCreateN`),
    hint: game.i18n.localize(`pin-cushion.SETTINGS.defaultNoteImageOnCreateH`),
    scope: "world",
    type: String,
    default: "",
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "specificFolder", {
    name: game.i18n.localize(`pin-cushion.SETTINGS.SpecificFolderN`),
    hint: game.i18n.localize(`pin-cushion.SETTINGS.SpecificFolderH`),
    scope: "world",
    type: String,
    choices: () => {
      const folders = game.journal.directory.folders.sort((a, b) => a.name.localeCompare(b.name));
      const arr = [];
      return Object.entries(folders).reduce((folder, [k, v]) => {
        folder[v.id] = v.name;
        return folder;
      }, {});
    },
    default: 0,
    config: true,
    onChange: (s) => {},
  });

  game.settings.register(CONSTANTS.MODULE_ID, "enableBackgroundlessPins", {
    name: game.i18n.localize(`pin-cushion.SETTINGS.EnableBackgroundlessPinsN`),
    hint: game.i18n.localize(`pin-cushion.SETTINGS.EnableBackgroundlessPinsH`),
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "showJournalImageByDefault", {
    name: game.i18n.localize(`pin-cushion.SETTINGS.ShowJournalImageByDefaultN`),
    hint: game.i18n.localize(`pin-cushion.SETTINGS.ShowJournalImageByDefaultH`),
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "enableTooltipByDefault", {
    name: game.i18n.localize(`pin-cushion.SETTINGS.enableTooltipByDefaultN`),
    hint: game.i18n.localize(`pin-cushion.SETTINGS.enableTooltipByDefaultH`),
    scope: "world",
    type: Boolean,
    default: false,
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "playerIconAutoOverride", {
    name: game.i18n.localize(`pin-cushion.SETTINGS.PlayerIconAutoOverrideN`),
    hint: game.i18n.localize(`pin-cushion.SETTINGS.PlayerIconAutoOverrideH`),
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "playerIconPathDefault", {
    name: game.i18n.localize(`pin-cushion.SETTINGS.PlayerIconPathDefaultN`),
    hint: game.i18n.localize(`pin-cushion.SETTINGS.PlayerIconPathDefaultH`),
    scope: "world",
    config: true,
    default: "icons/svg/book.svg",
    type: String,
    filePicker: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "noteGM", {
    name: game.i18n.localize(`pin-cushion.SETTINGS.noteGMN`),
    hint: game.i18n.localize(`pin-cushion.SETTINGS.noteGMH`),
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "revealedNotes", {
    name: game.i18n.localize(`pin-cushion.SETTINGS.revealedNotesN`),
    hint: game.i18n.localize(`pin-cushion.SETTINGS.revealedNotesH`),
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "revealedNotesTintColorLink", {
    name: game.i18n.localize(`pin-cushion.SETTINGS.revealedNotesTintColorLinkN`),
    hint: game.i18n.localize(`pin-cushion.SETTINGS.revealedNotesTintColorLinkH`),
    scope: "world",
    type: String,
    default: "#7CFC00",
    config: true,
    onChange: () => {
      if (canvas?.ready) {
        canvas.notes.placeables.forEach((note) => note.draw());
        //for (let note of canvas.notes.objects) note.draw();
      }
    },
  });

  game.settings.register(CONSTANTS.MODULE_ID, "revealedNotesTintColorNotLink", {
    name: game.i18n.localize(`pin-cushion.SETTINGS.revealedNotesTintColorNotLinkN`),
    hint: game.i18n.localize(`pin-cushion.SETTINGS.revealedNotesTintColorNotLinkH`),
    scope: "world",
    type: String,
    default: "#c000c0",
    config: true,
    onChange: () => {
      if (canvas?.ready) {
        canvas.notes.placeables.forEach((note) => note.draw());
        //for (let note of canvas.notes.objects) note.draw();
      }
    },
  });

  game.settings.register(CONSTANTS.MODULE_ID, "revealedNotesTintColorRevealed", {
    name: game.i18n.localize(`pin-cushion.SETTINGS.revealedNotesTintColorRevealedN`),
    hint: game.i18n.localize(`pin-cushion.SETTINGS.revealedNotesTintColorRevealedH`),
    scope: "world",
    type: String,
    default: "#ffff00",
    config: true,
    onChange: () => refresh(),
  });

  game.settings.register(CONSTANTS.MODULE_ID, "revealedNotesTintColorNotRevealed", {
    name: game.i18n.localize(`pin-cushion.SETTINGS.revealedNotesTintColorNotRevealedN`),
    hint: game.i18n.localize(`pin-cushion.SETTINGS.revealedNotesTintColorNotRevealedH`),
    scope: "world",
    type: String,
    default: "#ff0000",
    config: true,
    onChange: () => refresh(),
  });

  game.settings.register(CONSTANTS.MODULE_ID, "enableJournalThumbnailForGMs", {
    name: game.i18n.localize(`pin-cushion.SETTINGS.enableJournalThumbnailForGMsN`),
    hint: game.i18n.localize(`pin-cushion.SETTINGS.enableJournalThumbnailForGMsH`),
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
    onchange: () => window.location.reload(),
  });

  game.settings.register(CONSTANTS.MODULE_ID, "enableJournalThumbnailForPlayers", {
    name: game.i18n.localize(`pin-cushion.SETTINGS.enableJournalThumbnailForPlayersN`),
    hint: game.i18n.localize(`pin-cushion.SETTINGS.enableJournalThumbnailForPlayersH`),
    scope: "world",
    type: Boolean,
    default: true,
    config: true,
    onchange: () => window.location.reload(),
  });

  game.settings.register(CONSTANTS.MODULE_ID, "journalThumbnailPosition", {
    name: game.i18n.localize(`pin-cushion.SETTINGS.journalThumbnailPositionN`),
    hint: game.i18n.localize(`pin-cushion.SETTINGS.journalThumbnailPositionH`),
    scope: "world",
    config: true,
    default: "right",
    type: String,
    choices: {
      right: "Right",
      left: "Left",
    },
    onChange: () => game.journal.render(),
  });

  game.settings.register(CONSTANTS.MODULE_ID, "fontSize", {
    name: game.i18n.localize(`pin-cushion.SETTINGS.fontSizeN`),
    hint: game.i18n.localize(`pin-cushion.SETTINGS.fontSizeH`),
    scope: "client",
    type: String,
    default: "",
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "maxWidth", {
    name: game.i18n.localize(`pin-cushion.SETTINGS.maxWidthN`),
    hint: game.i18n.localize(`pin-cushion.SETTINGS.maxWidthH`),
    scope: "client",
    type: Number,
    default: 800,
    config: true,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "tooltipUseMousePositionForCoordinates", {
    name: game.i18n.localize(`pin-cushion.SETTINGS.tooltipUseMousePositionForCoordinatesN`),
    hint: game.i18n.localize(`pin-cushion.SETTINGS.tooltipUseMousePositionForCoordinatesH`),
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
  });

  // DEPRECATED ON V11
  //   game.settings.register(CONSTANTS.MODULE_ID, "oneClickNoteCreation", {
  //     name: game.i18n.localize(`pin-cushion.SETTINGS.oneClickNoteCreationN`),
  //     hint: game.i18n.localize(`pin-cushion.SETTINGS.oneClickNoteCreationH`),
  //     scope: "world",
  //     config: true,
  //     default: false,
  //     type: Boolean,
  //   });

  game.settings.register(CONSTANTS.MODULE_ID, "enableJournalAnchorLink", {
    name: game.i18n.localize(`pin-cushion.SETTINGS.enableJournalAnchorLinkN`),
    hint: game.i18n.localize(`pin-cushion.SETTINGS.enableJournalAnchorLinkH`),
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
  });

  // =====================
  // START MATT INTEGRATION
  // =====================
  /*
	game.settings.register(CONSTANTS.MODULE_ID, "allow-note", {
		name: game.i18n.localize(`pin-cushion.SETTINGS.allowNoteN`),
		hint: game.i18n.localize(`pin-cushion.SETTINGS.allowNoteH`),
		scope: "world",
		config: true,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "prevent-when-paused", {
		name: game.i18n.localize(`pin-cushion.SETTINGS.preventWhenPausedN`),
		hint: game.i18n.localize(`pin-cushion.SETTINGS.preventWhenPausedH`),
		scope: "world",
		config: true,
		default: true,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_ID, "allow-note-passthrough", {
		name: game.i18n.localize(`pin-cushion.SETTINGS.allowNotePassthroughN`),
		hint: game.i18n.localize(`pin-cushion.SETTINGS.allowNotePassthroughH`),
		scope: "world",
		config: true,
		default: true,
		type: Boolean
	});
	*/
  // =====================
  // END MATT INTEGRATION
  // =====================
};
class ResetSettingsDialog extends FormApplication {
  constructor(...args) {
    //@ts-ignore
    super(...args);
    //@ts-ignore
    return new Dialog({
      title: game.i18n.localize(`${CONSTANTS.MODULE_ID}.dialogs.resetsettings.title`),
      content:
        '<p style="margin-bottom:1rem;">' +
        game.i18n.localize(`${CONSTANTS.MODULE_ID}.dialogs.resetsettings.content`) +
        "</p>",
      buttons: {
        confirm: {
          icon: '<i class="fas fa-check"></i>',
          label: game.i18n.localize(`${CONSTANTS.MODULE_ID}.dialogs.resetsettings.confirm`),
          callback: async () => {
            const worldSettings = game.settings.storage
              ?.get("world")
              ?.filter((setting) => setting.key.startsWith(`${CONSTANTS.MODULE_ID}.`));
            for (let setting of worldSettings) {
              console.log(`Reset setting '${setting.key}'`);
              await setting.delete();
            }
            //window.location.reload();
          },
        },
        cancel: {
          icon: '<i class="fas fa-times"></i>',
          label: game.i18n.localize(`${CONSTANTS.MODULE_ID}.dialogs.resetsettings.cancel`),
        },
      },
      default: "cancel",
    });
  }
  async _updateObject(event, formData) {
    // do nothing
  }
}
