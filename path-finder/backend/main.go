package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

type Point struct {
	X int `json:"x"`
	Y int `json:"y"`
}

type PathRequest struct {
	StartX int `json:"startX"`
	StartY int `json:"startY"`
	EndX   int `json:"endX"`
	EndY   int `json:"endY"`
}

type PathResponse struct {
	Path []Point `json:"path"`
}

const gridSize = 20

func findPath(w http.ResponseWriter, r *http.Request) {
	var req PathRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	start := Point{X: req.StartX, Y: req.StartY}
	end := Point{X: req.EndX, Y: req.EndY}

	path := dfs(start, end)

	response := PathResponse{Path: path}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func dfs(start, end Point) []Point {
	visited := make(map[Point]bool)
	path := []Point{}
	if dfsHelper(start, end, visited, &path) {
		return path
	}
	return []Point{}
}

func dfsHelper(current, end Point, visited map[Point]bool, path *[]Point) bool {
	if current == end {
		*path = append(*path, current)
		return true
	}

	if visited[current] || !isValid(current) {
		return false
	}

	visited[current] = true
	*path = append(*path, current)

	directions := []Point{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}
	for _, dir := range directions {
		next := Point{X: current.X + dir.X, Y: current.Y + dir.Y}
		if dfsHelper(next, end, visited, path) {
			return true
		}
	}

	*path = (*path)[:len(*path)-1]
	return false
}

func isValid(p Point) bool {
	return p.X >= 0 && p.X < gridSize && p.Y >= 0 && p.Y < gridSize
}

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/find-path", findPath).Methods("POST")

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"},
		AllowedMethods: []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders: []string{"Content-Type", "Origin", "Accept", "*"},
	})

	handler := c.Handler(r)

	log.Println("Server is running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
}