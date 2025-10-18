import pygame
import sys

# Initialize pygame
pygame.init()

# Screen settings
WIDTH, HEIGHT = 800, 600
SCREEN = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Pong Game")

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

# Game settings
BALL_RADIUS = 15
PADDLE_WIDTH, PADDLE_HEIGHT = 10, 100
BALL_SPEED_X = 7
BALL_SPEED_Y = 7
PADDLE_SPEED = 7

# Fonts
FONT = pygame.font.SysFont("comicsans", 40)

# Paddle positions
player1_y = HEIGHT // 2 - PADDLE_HEIGHT // 2
player2_y = HEIGHT // 2 - PADDLE_HEIGHT // 2

# Ball position
ball_x = WIDTH // 2
ball_y = HEIGHT // 2
ball_speed_x = BALL_SPEED_X
ball_speed_y = BALL_SPEED_Y

# Scores
score1 = 0
score2 = 0

# Game loop
clock = pygame.time.Clock()

def draw():
    SCREEN.fill(BLACK)
    
    # Draw paddles
    pygame.draw.rect(SCREEN, WHITE, (20, player1_y, PADDLE_WIDTH, PADDLE_HEIGHT))
    pygame.draw.rect(SCREEN, WHITE, (WIDTH - 30, player2_y, PADDLE_WIDTH, PADDLE_HEIGHT))
    
    # Draw ball
    pygame.draw.circle(SCREEN, WHITE, (ball_x, ball_y), BALL_RADIUS)
    
    # Draw scores
    score_text = FONT.render(f"{score1} : {score2}", True, WHITE)
    SCREEN.blit(score_text, (WIDTH//2 - score_text.get_width()//2, 20))
    
    pygame.display.flip()

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
    
    # Paddle movement
    keys = pygame.key.get_pressed()
    if keys[pygame.K_w] and player1_y > 0:
        player1_y -= PADDLE_SPEED
    if keys[pygame.K_s] and player1_y < HEIGHT - PADDLE_HEIGHT:
        player1_y += PADDLE_SPEED
    if keys[pygame.K_UP] and player2_y > 0:
        player2_y -= PADDLE_SPEED
    if keys[pygame.K_DOWN] and player2_y < HEIGHT - PADDLE_HEIGHT:
        player2_y += PADDLE_SPEED

    # Ball movement
    ball_x += ball_speed_x
    ball_y += ball_speed_y

    # Collision with top/bottom
    if ball_y - BALL_RADIUS <= 0 or ball_y + BALL_RADIUS >= HEIGHT:
        ball_speed_y *= -1

    # Collision with paddles
    if ball_x - BALL_RADIUS <= 30 and player1_y < ball_y < player1_y + PADDLE_HEIGHT:
        ball_speed_x *= -1
    if ball_x + BALL_RADIUS >= WIDTH - 30 and player2_y < ball_y < player2_y + PADDLE_HEIGHT:
        ball_speed_x *= -1

    # Scoring
    if ball_x < 0:
        score2 += 1
        ball_x, ball_y = WIDTH // 2, HEIGHT // 2
        ball_speed_x *= -1
    if ball_x > WIDTH:
        score1 += 1
        ball_x, ball_y = WIDTH // 2, HEIGHT // 2
        ball_speed_x *= -1

    draw()
    clock.tick(60)

