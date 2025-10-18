import tkinter as tk
import random
import winsound  # Windows only, replace/remove for cross-platform sound

WIDTH, HEIGHT = 400, 600
SHIP_WIDTH, SHIP_HEIGHT = 40, 20
BULLET_WIDTH, BULLET_HEIGHT = 5, 10
ENEMY_WIDTH, ENEMY_HEIGHT = 40, 20
BULLET_SPEED = 10
ENEMY_SPEED_BASE = 3
DELAY = 30

class SpaceShooter:
    def __init__(self, master):
        self.master = master
        self.master.title("Space Shooter")
        self.canvas = tk.Canvas(master, width=WIDTH, height=HEIGHT, bg="black")
        self.canvas.pack()

        self.ship_x = WIDTH//2 - SHIP_WIDTH//2
        self.ship_y = HEIGHT - SHIP_HEIGHT - 10

        self.bullets = []
        self.enemies = []
        self.score = 0
        self.running = True
        self.paused = False
        self.move_dir = 0  # -1 left, 1 right, 0 stationary
        self.enemy_speed = ENEMY_SPEED_BASE
        self.spawn_chance = 20

        # Bind keys for continuous movement
        self.master.bind("<KeyPress-Left>", self.start_move_left)
        self.master.bind("<KeyRelease-Left>", self.stop_move)
        self.master.bind("<KeyPress-Right>", self.start_move_right)
        self.master.bind("<KeyRelease-Right>", self.stop_move)
        self.master.bind("<space>", self.shoot)
        self.master.bind("p", self.toggle_pause)
        self.master.bind("r", self.restart_game)

        self.spawn_enemy()
        self.update()

    def start_move_left(self, event):
        self.move_dir = -1
    def start_move_right(self, event):
        self.move_dir = 1
    def stop_move(self, event):
        self.move_dir = 0

    def toggle_pause(self, event=None):
        if self.running:
            self.paused = not self.paused

    def restart_game(self, event=None):
        if not self.running:
            self.__init__(self.master)

    def move_ship(self):
        if self.move_dir == -1 and self.ship_x > 0:
            self.ship_x -= 10
        elif self.move_dir == 1 and self.ship_x + SHIP_WIDTH < WIDTH:
            self.ship_x += 10

    def shoot(self, event):
        if self.running and not self.paused:
            self.bullets.append([self.ship_x + SHIP_WIDTH//2 - BULLET_WIDTH//2, self.ship_y])
            # winsound.PlaySound('shoot.wav', winsound.SND_ASYNC)  # Add sound file for shoot

    def spawn_enemy(self):
        if self.running and not self.paused:
            x = random.randint(0, WIDTH - ENEMY_WIDTH)
            self.enemies.append([x, 0])

    def move_bullets(self):
        for bullet in self.bullets:
            bullet[1] -= BULLET_SPEED
        self.bullets = [b for b in self.bullets if b[1] > 0]

    def move_enemies(self):
        for enemy in self.enemies:
            enemy[1] += self.enemy_speed
        self.enemies = [e for e in self.enemies if e[1] < HEIGHT]

        # Increase difficulty slightly as score grows
        if self.score > 0 and self.score % 5 == 0:
            self.spawn_chance = max(5, 20 - self.score // 2)
            self.enemy_speed = ENEMY_SPEED_BASE + self.score // 10

        if random.randint(0, self.spawn_chance) == 0:
            self.spawn_enemy()

    def check_collision(self):
        bullets_to_remove = []
        enemies_to_remove = []

        for bullet in self.bullets:
            for enemy in self.enemies:
                if (bullet[0] < enemy[0] + ENEMY_WIDTH and
                    bullet[0] + BULLET_WIDTH > enemy[0] and
                    bullet[1] < enemy[1] + ENEMY_HEIGHT and
                    bullet[1] + BULLET_HEIGHT > enemy[1]):

                    bullets_to_remove.append(bullet)
                    enemies_to_remove.append(enemy)
                    self.score += 1
                    # winsound.PlaySound('explosion.wav', winsound.SND_ASYNC)  # Add sound file for explosion

        for b in bullets_to_remove:
            if b in self.bullets:
                self.bullets.remove(b)
        for e in enemies_to_remove:
            if e in self.enemies:
                self.enemies.remove(e)

    def draw(self):
        self.canvas.delete("all")
        self.canvas.create_rectangle(self.ship_x, self.ship_y,
                                     self.ship_x + SHIP_WIDTH, self.ship_y + SHIP_HEIGHT,
                                     fill="blue")
        for b in self.bullets:
            self.canvas.create_rectangle(b[0], b[1], b[0] + BULLET_WIDTH, b[1] + BULLET_HEIGHT, fill="yellow")
        for e in self.enemies:
            self.canvas.create_rectangle(e[0], e[1], e[0]+ENEMY_WIDTH, e[1]+ENEMY_HEIGHT, fill="red")
        self.canvas.create_text(50, 20, text=f"Score: {self.score}", font=("Arial", 16), fill="white")

        if self.paused:
            self.canvas.create_text(WIDTH//2, HEIGHT//2, text="Paused", font=("Arial", 32), fill="yellow")

    def update(self):
        if self.running and not self.paused:
            self.move_ship()
            self.move_bullets()
            self.move_enemies()
            self.check_collision()

            for e in self.enemies:
                if (e[0] < self.ship_x + SHIP_WIDTH and e[0] + ENEMY_WIDTH > self.ship_x and
                    e[1] + ENEMY_HEIGHT > self.ship_y):
                    self.running = False
                    self.canvas.create_text(WIDTH//2, HEIGHT//2, text="Game Over!", font=("Arial", 32), fill="red")
                    return

            self.draw()

        self.master.after(DELAY, self.update)

if __name__ == "__main__":
    root = tk.Tk()
    game = SpaceShooter(root)
    root.mainloop()
