import { ElementWrapper } from "./pin-cushion-pixi-element-wrapper";

export class PinCushionPixiHelpers {
  static drawTooltipPixi(note) {
    const journal = note.entry;
    let journalType = "";
    let pageType = "";
    if (journal) {
      journalType = PinCushionPixiHelpers.retrieveJournalTypeFromJournal(journal);
      pageType = PinCushionPixiHelpers.retrievePageTypeFromJournal(journal);
    }

    // Destroy any prior text
    if (note.tooltip) {
      note.removeChild(note.tooltip);
      note.tooltip = undefined;
    }

    // TODO create content html by calling a macro
    const contentHTML = "";

    // Create Element
    const wrappedEl = PinCushionPixiHelpers.wrapElement(contentHTML, note);

    // Add child and return
    return (note.tooltip = note.addChild(wrappedEl));
  }

  static retrievePageTypeFromJournal(journal) {
    let pageType = "";
    if (journal?.pages?.contents?.length > 0) {
      if (journal?.pages.contents[0].getFlag("monks-enhanced-journal", "type")) {
        pageType = journal?.pages.contents[0].getFlag("monks-enhanced-journal", "type");
      } else {
        pageType = journal?.pages.contents[0].type;
      }
    }
    return pageType;
  }

  static retrieveJournalTypeFromJournal(journal) {
    let journalType = "";
    if (journal?.getFlag("monks-enhanced-journal", "pagetype")) {
      journalType = journal?.getFlag("monks-enhanced-journal", "pagetype");
    } else {
      journalType = journal.type;
    }
    return journalType;
  }

  static async wrapElement(contentHTML, note) {
    const fontSize = game.settings.get(CONSTANTS.MODULE_ID, "fontSize") || canvas.grid.size / 5;
    const maxWidth = game.settings.get(CONSTANTS.MODULE_ID, "maxWidth") || 400;

    // const isTooltipShowTitleS = getProperty(
    //   this.object.document.flags[CONSTANTS.MODULE_ID],
    //   CONSTANTS.FLAGS.TOOLTIP_SHOW_TITLE
    // );
    // const isTooltipShowDescriptionS = getProperty(
    //   this.object.document.flags[CONSTANTS.MODULE_ID],
    //   CONSTANTS.FLAGS.TOOLTIP_SHOW_DESCRIPTION
    // );

    // const isTooltipShowTitle = String(isTooltipShowTitleS) === "true" ? true : false;
    // const isTooltipShowDescription = String(isTooltipShowDescriptionS) === "true" ? true : false;

    // const container = $(`<aside class="${tooltipClass}" style="opacity: 0; display: none;"></aside>`)[0];

    // const container = $(await TextEditor.enrichHTML(`
    //       <div id="container" class="pin-cushion-hud-container" style="font-size:${fontSize}px; max-width:${maxWidth}px">
    //           ${isTooltipShowTitle ? `<div id="header"><h3>${titleTooltip}</h3></div><hr/>` : ``}
    //           ${isTooltipShowDescription ? `<div id="content">${contentHTML} </div>` : ``}
    //       </div>
    // `));
    const container = $(
      `<aside class="pin-cushion-hud-container" style="font-size:${fontSize}px; max-width:${maxWidth}px; opacity: 0; display: none;"></aside>`
    )[0];

    // create wrapped element
    const wrappedElement = new ElementWrapper(container, contentHTML, note);
    wrappedElement.anchorXY = 0;
    wrappedElement.visible = false;

    return wrappedElement;
  }
}
