// Basic Turing Machine Implementation in Java
import java.util.*;

class TuringMachine {
    private char[] tape;
    private int head;
    private String state;
    private Map<String, Transition> transitions;
    private char blankSymbol = '_';
    
    static class Transition {
        String fromState;
        char readSymbol;
        char writeSymbol;
        char direction; // 'L', 'R', or 'S'
        String toState;
        Transition(String fromState, char readSymbol, char writeSymbol, char direction, String toState) {
            this.fromState = fromState;
            this.readSymbol = readSymbol;
            this.writeSymbol = writeSymbol;
            this.direction = direction;
            this.toState = toState;
        }
    }
    
    public TuringMachine(String tapeInput, String initialState, char blankSymbol) {
        this.tape = (tapeInput + blankSymbol + blankSymbol + blankSymbol).toCharArray();
        this.head = 0;
        this.state = initialState;
        this.transitions = new HashMap<>();
        this.blankSymbol = blankSymbol;
    }
    
    public void addTransition(String fromState, char readSymbol, char writeSymbol, char direction, String toState) {
        String key = fromState + readSymbol;
        transitions.put(key, new Transition(fromState, readSymbol, writeSymbol, direction, toState));
    }
    
    public void run(Set<String> haltStates) {
        while (!haltStates.contains(state)) {
            String key = state + tape[head];
            Transition t = transitions.get(key);
            if (t == null) {
                System.out.println("No transition defined for " + key + ". Halting.");
                break;
            }
            // Apply transition
            tape[head] = t.writeSymbol;
            if (t.direction == 'R') head++;
            else if (t.direction == 'L') head--;
            state = t.toState;
        }
        System.out.println("Final Tape: " + new String(tape).trim());
    }
}

public class Main {
    public static void main(String[] args) {
        // Example: Unary increment (adds 1 to a string of 1s, e.g. '111' -> '1111')
        TuringMachine tm = new TuringMachine("111", "q0", '_');
        // Transition: q0,1 -> q0,1,R
        tm.addTransition("q0", '1', '1', 'R', "q0");
        // Transition: q0,_ -> qf,1,S (write 1 at the end and halt)
        tm.addTransition("q0", '_', '1', 'S', "qf");
        
        Set<String> haltStates = new HashSet<>();
        haltStates.add("qf");
        tm.run(haltStates);
    }
}
