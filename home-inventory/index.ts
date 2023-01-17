const dummyData = {
  inventoryItems: [
    {
      itemName: "bananas",
      itemDescription: "The blue java kind.",
    },
    {
      itemName: "milk",
      itemDescription: "Whole milk only.",
    },
    {
      itemName: "bread",
      itemDescription: "",
    },
    {
      itemName: "apples",
      itemDescription: "Anything but red delicious.",
    },
    {
      itemName: "eggs",
      itemDescription: "60 eggs",
    },
  ],
};

interface HtmlElement {
  domElement: HTMLElement;
  getDomElement(): HTMLElement;
}

enum InventoryItemState {
  ORIGINAL,
  UPDATED,
  NEW,
  DELETED,
}

class InventoryItem implements HtmlElement {
  domElement: HTMLElement;
  private itemName: string;
  private itemDescription: string;
  private itemState: InventoryItemState;

  constructor(
    itemName: string,
    itemDescription: string,
    itemState: InventoryItemState
  ) {
    if (
      itemState !== InventoryItemState.ORIGINAL ||
      itemState !== InventoryItemState.NEW
    ) {
      throw new Error("Invalid item state");
    }

    this.itemName = itemName;
    this.itemDescription = itemDescription;
    this.itemState = itemState;
    this.createDomElement();
  }

  updateItem(itemName: string, itemDescription: string): void {
    this.itemName = itemName;
    this.itemDescription = itemDescription;
    this.itemState = InventoryItemState.UPDATED;
    this.createDomElement();
  }

  deleteItem(): void {
    this.itemState = InventoryItemState.DELETED;
    this.hideElement();
  }

  getItemName(): string {
    return this.itemName;
  }

  private createDomElement(): void {
    const itemWrapper: HTMLElement = document.createElement("div");
    const itemHeader: HTMLElement = document.createElement("h3");
    const description: HTMLElement = document.createElement("textarea");

    itemHeader.innerText = this.itemName;
    description.innerText = this.itemDescription;

    itemWrapper.appendChild(itemHeader);
    itemWrapper.appendChild(description);

    this.domElement = itemWrapper;
  }

  hideElement(): void {
    this.domElement.style.display = "none";
  }

  displayElement(): void {
    this.domElement.style.display = "inline";
  }

  getDomElement(): HTMLElement {
    return this.domElement;
  }
}

class InventoryList implements HtmlElement {
  domElement: HTMLElement;
  private inventoryItems: InventoryItem[];

  constructor(inventoryItems: InventoryItem[]) {
    this.inventoryItems = inventoryItems;
    this.createDomElement();
  }

  static getInventoryList(list: JSON): InventoryList {
    const inventoryItems: InventoryItem[] = list["inventoryItems"].map(
      (item) => {
        return new InventoryItem(item.itemName, item.itemDescription);
      }
    );

    return new InventoryList(inventoryItems);
  }

  searchForItem(itemName: string): void {
    if (!itemName) {
      this.inventoryItems.forEach((item) => {
        item.displayElement();
      });
      return;
    }

    this.inventoryItems.forEach((item) => {
      if (item.getItemName().includes(itemName)) {
        item.displayElement();
      } else {
        item.hideElement();
      }
    });
  }

  private createDomElement(): void {
    const listWrapper: HTMLElement = document.createElement("ul");

    this.inventoryItems.forEach((item) => {
      listWrapper.appendChild(item.getDomElement());
    });

    this.domElement = listWrapper;
  }

  getDomElement(): HTMLElement {
    return this.domElement;
  }
}
