// TODO: Need more documentation
// Need to add api client to test below code

interface HtmlElement {
  domElement: HTMLElement;
  getDomElement(): HTMLElement;
}

interface InventoryItemJSON {
  itemName: string;
  itemDescription: string;
  itemId: string;
}

enum InventoryItemState {
  ORIGINAL,
  UPDATED,
  NEW,
  DELETED,
}

const InventoryAPI = "http://127.0.0.1:8080/Inventory"

class InventoryItem implements HtmlElement {
  domElement: HTMLElement;
  private itemName: string;
  private itemDescription: string;
  private itemId: string;
  itemState: InventoryItemState;

  constructor(
    itemName: string,
    itemDescription: string,
    itemState: InventoryItemState,
    itemId?: string
  ) {

    if(itemState !== InventoryItemState.ORIGINAL && itemState !== InventoryItemState.NEW) {
      throw new Error("Invalid item state.");
    }

    if(itemState === InventoryItemState.ORIGINAL && !itemId) {
      throw new Error("Item ID is required for original items.");
    }

    this.itemName = itemName;
    this.itemDescription = itemDescription;
    this.itemId = itemId || "";
    this.itemState = itemState;
    this.createDomElement();
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

  // When an item's name and or description is updated
  updateItem(itemName: string, itemDescription: string): void {
    // If item is original and updated then want to update it in the database
    // otherwise just update the frontend
    if(this.itemState === InventoryItemState.ORIGINAL) this.itemState = InventoryItemState.UPDATED;
    this.itemName = itemName;
    this.itemDescription = itemDescription;
    
    
    this.createDomElement();
  }

  // When the user wants to delete an item, if it has an id then it will be removed from the database
  // otherwise its not in the db and will be simply removed from the list
  deleteItem(): void {
    this.itemState = InventoryItemState.DELETED;
    this.hideElement();
  }

  // Public method for getting the item's name
  getItemName(): string {
    return this.itemName;
  }

  // Public method for getting the item's description
  getItemDescription(): string {
    return this.itemDescription;
  }

  // Public and internal method for hiding the item from the list
  // An item is hidden when it does not appear in a search or when it is "deleted"
  hideElement(): void {
    this.domElement.style.display = "none";
  }

  // Public method for displaying the item in the list
  // An item is displayed when it appears in a search
  displayElement(): void {
    this.domElement.style.display = "inline";
  }

  // Public method for getting the item as a DOM element
  // This is used to place the item on the DOM
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

  static getInventoryList(jsonList: JSON): InventoryList {
    const list = JSON.parse(JSON.stringify(jsonList)) as InventoryItemJSON[];
    const inventoryItems: InventoryItem[] = list.map((item) => {
      return new InventoryItem(
        item.itemName,
        item.itemDescription,
        InventoryItemState.ORIGINAL,
        item.itemId
      );
    });

    return new InventoryList(inventoryItems);
  }

  searchForItem(itemName: string): void {
    // If !itemName then nothing is being searched so display all items that are not deleted
    if (!itemName) {
      this.inventoryItems.forEach((item) => {
        if(item.itemState !== InventoryItemState.DELETED) item.displayElement();
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
