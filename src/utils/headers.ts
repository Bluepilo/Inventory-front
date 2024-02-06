const headers = {
	"Content-Type": "application/json",
};

const authHeader = (token: string) => ({
	Authorization: `Bearer ${token}`,
	"Content-Type": "application/json",
});

export { headers, authHeader };
