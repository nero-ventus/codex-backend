verifyRoles = (allowedRoles) => {
    return (req, res, next) => {
        const user = req.user; // Assuming the `verifyToken` middleware has added the `user` object to `req`

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!allowedRoles.includes(user.role)) {
            return res.status(403).json({ message: "Forbidden: You do not have access to this resource" });
        }

        next();
    };
};

module.exports = verifyRoles;
