package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type InventoryItem struct {
	ItemName  string `json:"itemName"`
	ItemDescription string `json:"itemDescription"`
	ItemId string `json:"itemId"`
}

func inventoryHandler(w http.ResponseWriter, r *http.Request, inventory []InventoryItem) {
	if r.Method != "GET"{
		w.WriteHeader(http.StatusNotFound)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(inventory)
}

func main() {

	var inventory []InventoryItem = []InventoryItem{
		{ItemName: "Screwdriver", ItemDescription: "A Phillips head screwdriver", ItemId: "1"},
		{ItemName: "Hammer", ItemDescription: "A claw hammer", ItemId: "2"},
		{ItemName: "Wrench", ItemDescription: "A 12 inch adjustable wrench", ItemId: "3"},
	}


	http.HandleFunc("/Inventory", func(w http.ResponseWriter, r *http.Request) {
		inventoryHandler(w, r, inventory)
	})

	fmt.Println("Server listening on port 8080")
	http.ListenAndServe(":8080", nil)
}
