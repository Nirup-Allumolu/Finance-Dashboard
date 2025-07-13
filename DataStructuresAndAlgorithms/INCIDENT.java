public class INCIDENT {

    public int[][] adjacencyMatToIncidenceMat(int[][] adj) {
        int vertices = adj.length; 
        int edges = 0;
        for (int i = 0; i < vertices; i++) {
            for (int j = i + 1; j < vertices; j++) { 
                if (adj[i][j] > 0) {
                    edges++;
                }
            }
        }
        int[][] incidenceMat = new int[vertices][edges];
        int edgeIndex = 0; 

        for (int i = 0; i < vertices; i++) {
            for (int j = i + 1; j < vertices; j++) {
                if (adj[i][j] > 0) {
                    incidenceMat[i][edgeIndex] = 1;
                    incidenceMat[j][edgeIndex] = 1;
                    edgeIndex++; 
                }
            }
        }
        return incidenceMat;
    }
    static void printAdjacencyMatrix(int[][] adj) {
        System.out.println("Adjacency Matrix:");
        for (int[] row : adj) {
            for (int val : row) {
                System.out.print(val + " ");
            }
            System.out.println();
        }
    }
    static void printIncidenceMatrix(int[][] incidence) {
        System.out.println("\nIncidence Matrix:");
        for (int[] row : incidence) {
            for (int val : row) {
                System.out.print(val + " ");
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        INCIDENT graph = new INCIDENT();
        int[][] adj = {
            {0, 1, 1, 0, 0, 0, 0},
            {1, 0, 0, 1, 0, 0, 0},
            {1, 0, 0, 1, 1, 0, 0},
            {0, 1, 1, 0, 1, 1, 0},
            {0, 0, 1, 1, 0, 1, 1},
            {0, 0, 0, 1, 1, 0, 1},
            {0, 0, 0, 0, 1, 1, 0}
        };
        printAdjacencyMatrix(adj);
        int[][] incidence = graph.adjacencyMatToIncidenceMat(adj);
        printIncidenceMatrix(incidence);
    }
}
